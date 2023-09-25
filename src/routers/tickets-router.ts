import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";

const ticketsRouter = Router();

ticketsRouter
    .all("/*", authenticateToken)
    .get("/types", getTicketsTypes)
    .get("/", getTickets)
    .post("/", validateBody(ticketSchema), createTicket);