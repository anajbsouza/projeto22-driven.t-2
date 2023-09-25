import { prisma } from '@/config';
import { CreateTicket } from '@/protocols';
import { Enrollment, Ticket, TicketType } from '@prisma/client';

async function findTicketsTypes(): Promise<TicketType[]> {
    return await prisma.ticketType.findMany();
}

async function findTicketByEnrollmentId(id: number): Promise<Enrollment> {
    return prisma.enrollment.findFirst({
        where: { userId: id }
    })
}

async function createTicket(ticket: CreateTicket): Promise<Ticket> {
    const newTicket = await prisma.ticket.create({
        data: {
        ...ticket,
        }
    });
    return newTicket;
}

async function findTicketById(enrollmentId: number): Promise<Ticket> {
    return prisma.ticket.findUnique({
        where: { enrollmentId },
        include: { TicketType: true }
    })
}

const ticketsRepository = { findTicketsTypes, findTicketByEnrollmentId, createTicket, findTicketById };

export default ticketsRepository;