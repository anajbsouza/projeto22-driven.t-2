import { notFoundError, invalidDataError, unauthorizedError } from "@/errors";
import { CreateTicket } from "@/protocols";
import { enrollmentRepository } from "@/repositories/enrollments-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import { TicketStatus } from "@prisma/client";

async function getTicketType() {
    const ticketTypes = await ticketsRepository.findTicketsTypes();
    return ticketTypes || [];
}

async function getTicketByUserId(userId: number) {
    if (!userId) throw unauthorizedError();

    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if(!enrollment) throw notFoundError();

    const ticket = await ticketsRepository.findTicketById(userId);
    if(!ticket) throw notFoundError();
    return ticket;
} 

async function createTicket (userId: number, ticketTypeId: number) {
    if (!ticketTypeId) throw invalidDataError("ticket type id");
    if (!userId) throw unauthorizedError();
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) throw notFoundError();
    const ticket = ticketsRepository.findTicketById(ticketTypeId);
    if (!ticket) throw notFoundError();
    return await ticketsRepository.createTicket(ticketTypeId, enrollment.id);
}

const ticketService = { getTicketType, getTicketByUserId, createTicket };

export default ticketService;