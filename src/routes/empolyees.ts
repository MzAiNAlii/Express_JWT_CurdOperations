import { Router }from 'express'

import EmployeeCreated from '../controllers/empCreate';

import findAllEmp from '../controllers/findAllEmp';

import EmployeeFindById from '../controllers/empFindById';

import empUpdate from '../controllers/updateEmp';

import deleteEmp from '../controllers/deleteEmp';

const router = Router();

router.post("/employeecreated",EmployeeCreated)

router.get("/allemployee",findAllEmp)

router.get("/:str_id",EmployeeFindById)

router.put("/:str_id1",empUpdate)

router.delete("/:str_id2",deleteEmp)

export default router;
