import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import ticketService from "@/services/tickets-service";
import { enrollmentRepository } from "@/repositories";
import { notFoundError } from "@/errors";
import { CreateTicket } from "@/protocols";
import { TicketStatus } from "@prisma/client";
import ticketsRepository from "@/repositories/tickets-repository";

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
    const result = await ticketService.getTicketType();
    res.status(httpStatus.OK).send(result);
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const result = await ticketService.getTicketByUserId(userId);
    return res.status(httpStatus.OK).send(result);
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { ticketTypeId } = req.body as {ticketTypeId: number};;
    const result = await ticketService.createTicket(userId, ticketTypeId);
    res.status(httpStatus.CREATED).send(result);
}
