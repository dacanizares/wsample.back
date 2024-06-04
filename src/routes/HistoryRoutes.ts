import express, { Request, Response, NextFunction } from "express";

import { MapTo, MapAllTo } from "../infrastructure/Mapper";
import { History } from "../domain/models/History";
import { HistoryViewModel } from "../viewModels/HistoryViewModels";
import HistoryQueries from "../queries/HistoryQueries";
import { tryParseNumber } from "../mappers/BasicMapper";

const router = express.Router();

const historyLog = (_req: Request, _res: Response, next: NextFunction) => {
  if (process.env.VERBOSE === "true") {
    console.log(`[server]: Accessing history route.`);
  }
  next();
}

router.use(historyLog);

//
// GET: history/:employeeId
//
router.get('/:employeeId', async (req: Request, res: Response, next: NextFunction) => {
 try {
    const employeeId = tryParseNumber(req.params['employeeId']);
    if (!employeeId) {
      res.status(400).send('employeeId is not a number');
    } else {
      const result = await HistoryQueries.findHistoryByEmployeeId(employeeId);
      
      if (result) {
        res.send(
          MapAllTo<History, HistoryViewModel>(result, HistoryViewModel)
        );
      } else {
        res.status(404).send(`History for employeeId ${employeeId} not found.`);
      }
    }
  } catch (error) {
    console.log(`[server]: Path: "/". Body: "${req.body}"`);
    next(error);
  }
});

export default router;

