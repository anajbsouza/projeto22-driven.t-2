import { notFoundError } from "@/errors";
import { CreateTicket } from "@/protocols";
import { enrollmentRepository } from "@/repositories/enrollments-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import { TicketStatus } from "@prisma/client";

async function getTicketType() {
    const ticketTypes = await ticketsRepository.findTicketsTypes();
    return ticketTypes || [];
}

async function getTicketByUserId(userId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if(!enrollment) throw notFoundError();

    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
    if(!ticket) throw notFoundError();
    return ticket;
} 

async function createTicket (userId: number, ticketTypeId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) throw notFoundError();
    const ticketData: CreateTicket = {
        ticketTypeId,
        enrollmentId: enrollment.id,
        status: TicketStatus.RESERVED,
    };
    await ticketsRepository.createTicket(ticketData);
    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
    return ticket;
}

const ticketService = { getTicketType, getTicketByUserId, createTicket };

export default ticketService;