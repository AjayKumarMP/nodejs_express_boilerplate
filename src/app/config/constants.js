module.exports = {
    getHiringDataForSparkHub: " \
    SELECT  aral.id, prj.name as project_name, pra.name as practice_name, competency, designation, location, \
    facility, skill, position_type, aral.status, aral.type_of_project, requirement_expiry_date, remarks_4, urgent, \
    employee_type, hiring_type, location_type, approval_status, acc.name, aral.billing_end_date, aral.original_billable_date \
    FROM allocation_request aral, practice pra, project prj, account acc \
    WHERE aral.status NOT IN ('ALLOCATED', 'CANCELED') \
    AND pra.id = aral.practice_id \
    AND prj.id = aral.project_id \
    AND acc.id = aral.account_id \
    AND aral.employee_type = 'EXTERNAL' LIMIt 2",

    getSparkHubResource: "SELECT * from opex_sparkhub_resource where resourceName =:resourceName",
}