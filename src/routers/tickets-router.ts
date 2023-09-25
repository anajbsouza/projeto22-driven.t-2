import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { ticketSchema } from "@/schemas/ticket-schema";
import { createTicket, getTickets, getTicketsTypes } from "@/controllers/tickets-controller";

const ticketsRouter = Router();

ticketsRouter
    .all("/*", authenticateToken)
    .get("/tickets/types", getTicketsTypes)
    .get("/tickets", getTickets)
    .post("/tickets", validateBody(ticketSchema), createTicket);