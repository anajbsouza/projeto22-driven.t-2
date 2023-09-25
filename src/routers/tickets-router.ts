import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { ticketSchema } from "@/schemas/ticket-schema";
import { createTicket, getTickets, getTicketsTypes } from "@/controllers/tickets-controller";

const ticketsRouter = Router();

ticketsRouter
    .all("/*", authenticateToken)
    .get("/types", getTicketsTypes)
    .get("/", getTickets)
    .post("/", validateBody(ticketSchema), createTicket);