import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import { Enquiry } from "@/models/Enquiry";
import { Newsletter } from "@/models/Newsletter";
import { SubCategory } from "@/models/SubCategory";
import { Contact } from "@/models/Contact";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const [
      totalProducts, 
      totalCategories, 
      totalSubCategories, 
      totalEnquiries, 
      totalSubscribers, 
      totalMessages,
      pendingEnquiries,
      unreadMessages
    ] = await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      SubCategory.countDocuments(),
      Enquiry.countDocuments(),
      Newsletter.countDocuments(),
      Contact.countDocuments(),
      Enquiry.countDocuments({ status: 'Pending' }),
      Contact.countDocuments({ isRead: false }),
    ]);

    // Fetch real data for chart (last 6 months)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const last6Months = [];
    
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const monthLabel = months[d.getMonth()];
      const start = new Date(d.getFullYear(), d.getMonth(), 1);
      const end = new Date(d.getFullYear(), d.getMonth() + 1, 0);

      const [enqCount, msgCount] = await Promise.all([
        Enquiry.countDocuments({ createdAt: { $gte: start, $lte: end } }),
        Contact.countDocuments({ createdAt: { $gte: start, $lte: end } })
      ]);

      last6Months.push({
        name: monthLabel,
        enquiries: enqCount,
        messages: msgCount,
      });
    }

    const recentActivity = await Promise.all([
      Enquiry.find().sort({ createdAt: -1 }).limit(2),
      Contact.find().sort({ createdAt: -1 }).limit(2)
    ]).then(([enqs, msgs]) => {
      const activities = [
        ...enqs.map(e => ({ text: `New enquiry from ${e.name}`, time: e.createdAt, type: 'enquiry' })),
        ...msgs.map(m => ({ text: `New message from ${m.name}`, time: m.createdAt, type: 'message' }))
      ];
      return activities.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 4);
    });

    const categoryData = await Promise.all(
      (await Category.find()).map(async (cat) => ({
        name: cat.name,
        value: await Product.countDocuments({ category: cat._id })
      }))
    );

    return NextResponse.json({
      success: true,
      stats: {
        totalProducts,
        totalCategories,
        totalSubCategories,
        totalEnquiries,
        totalMessages,
        totalSubscribers,
        pendingEnquiries,
        unreadMessages
      },
      chartData: last6Months,
      categoryData,
      recentActivity
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
