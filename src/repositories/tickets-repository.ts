import { Enrollment, Ticket, TicketType } from '@prisma/client';
import { prisma } from '@/config';
import { CreateTicket } from '@/protocols';

async function findTicketsTypes(): Promise<TicketType[]> {
  const result = await prisma.ticketType.findMany();
  return result;
}

async function findTicketByEnrollmentId(enrollmentId: number) {
  const result = prisma.ticket.findUnique({
    where: { enrollmentId },
    include: { TicketType: true },
  });
  return result;
}

async function createTicket(ticket: CreateTicket) {
  const result = await prisma.ticket.create({
    data: ticket,
    include: { TicketType: true },
  });
  return result;
}

async function findTicketById(ticketId: number) {
    const result = await prisma.ticket.findUnique({
        where: { id: ticketId },
        include: { TicketType: true },
    });

    return result;
}  

const ticketsRepository = { findTicketsTypes, findTicketByEnrollmentId, createTicket, findTicketById };

export default ticketsRepository;
