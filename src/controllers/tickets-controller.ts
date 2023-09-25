import { Request, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import ticketService from "@/services/tickets-service";

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
    try {
        const ticket = await ticketService.createTicket(userId, ticketTypeId);
        res.send(ticket);
    } catch (e) {
        return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
}