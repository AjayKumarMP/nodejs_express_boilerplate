module.exports = {
    getHiringDataForSparkHub:  "  SELECT hsi.id, aral.sid, prj.name as project_name, pra.name as practice_name, competency, designation, location, facility, skill, position_type, " + 
    " aral.status, aral.type_of_project, requirement_expiry_date, remarks_4, urgent, employee_type, hiring_type, location_type, approval_status, " +
    " acc.name, aral.billing_end_date, aral.original_billable_date " + 
    " FROM allocation_request_audit_logs aral " + 
    " JOIN practice pra ON pra.id = aral.practice_id " + 
    " JOIN project prj ON prj.id = aral.project_id " + 
    " JOIN hiring_sparkhub_id hsi ON aral.id = hsi.audit_log_id " +
    " JOIN account acc ON acc.id = aral.account_id " +
    " WHERE aral.status NOT IN ('ALLOCATED', 'CANCELED') AND aral.employee_type = 'EXTERNAL' ORDER BY hsi.id DESC",

    getSparkHubResource: "SELECT * from opex_sparkhub_resource where resourceName =:resourceName",
}