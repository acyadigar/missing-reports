const BaseService = require("./base-service");
const ReportModel = require("../models/report");

class ReportService extends BaseService {
  model = ReportModel;
}

module.exports = new ReportService();
