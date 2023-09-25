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
    try {
        const ticketTypes = await ticketService.getTicketType();
        if (ticketTypes.length === 0) {
            return res.status(httpStatus.OK).send([]);
        } else {
            return res.status(httpStatus.OK).send(ticketTypes);
        }
    } catch (e) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    try {
        const ticket = await ticketService.getTicketByUserId(userId);
        if (!ticket) {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        return res.status(httpStatus.OK).send(ticket);
    } catch (e) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { ticketTypeId } = req.body;
    if (!ticketTypeId) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    try {
        const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
        if (!enrollment) throw notFoundError();
        const ticketData: CreateTicket = {
            ticketTypeId,
            enrollmentId: enrollment.id,
            status: TicketStatus.RESERVED,
        };
    const createdTicket = await ticketsRepository.createTicket(ticketData);
    return createdTicket;
    
} catch (e) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}