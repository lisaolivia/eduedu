import SystemNotification from "../models/SystemNotification.js";

export const listActive = async (req, res, next) => {
  try {
    const now = new Date();
    const role = req.user?.role || "parent";
    
    // Build audience filter
    const audienceFilter = {
      $or: [
        { audience: "all" },
        { audience: role + "s" },
        { audience: role }
      ]
    };
    
    const rows = await SystemNotification.find({
      validFrom: { $lte: now },
      $or: [
        { validTo: { $gte: now } },
        { validTo: { $exists: false } },
        { validTo: null }
      ],
      ...audienceFilter
    }).sort({ createdAt: -1 });
    res.json(rows);
  } catch (e) { next(e); }
};