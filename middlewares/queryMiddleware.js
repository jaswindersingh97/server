
function queryHandler(req, res, next) {
    const today = new Date();
    const { filterBy = 'week', sortBy = 'created', order = 'desc' } = req.query;
    let dateFilter = {};
    let sortOption = {};
  
    switch (filterBy) {
      case 'day': {
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));
        dateFilter = { createdAt: { $gte: startOfDay, $lte: endOfDay } };
        break;
      }
      case 'week': {
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);
        dateFilter = { createdAt: { $gte: startOfWeek, $lte: endOfWeek } };
        break;
      }
      case 'month': {
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        dateFilter = { createdAt: { $gte: startOfMonth, $lte: endOfMonth } };
        break;
      }
      default:
        break;
    }
  
    if (sortBy === 'created') {
      sortOption.createdAt = order === 'asc' ? 1 : -1;
    } else if (sortBy === 'updated') {
      sortOption.updatedAt = order === 'asc' ? 1 : -1;
    }
  
    req.dateFilter = dateFilter;
    req.sortOption = sortOption;
  
    next();
  };
  module.exports = queryHandler;