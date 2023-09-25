import { prisma } from '@/config';
import { CreateTicket } from '@/protocols';
import { TicketType } from '@prisma/client';

async function findTicketsTypes(): Promise<TicketType[]> {
    return prisma.ticketType.findMany();
}

async function findTicketByEnrollmentId(enrollmentId: number) {
    return prisma.ticket.findFirst({
        where: { enrollmentId },
        include: { TicketType: true }
    })
}

async function createTicket(ticket: CreateTicket) {
    return prisma.ticket.create({
        data: ticket
    })
}

async function findTicketById(ticketId: number) {
    return prisma.ticket.findUnique({
        where: { id: ticketId },
        include: { Enrollment: true }
    })
}

const ticketsRepository = { findTicketsTypes, findTicketByEnrollmentId, createTicket, findTicketById };

export default ticketsRepository;