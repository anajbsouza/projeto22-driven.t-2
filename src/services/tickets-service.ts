import { TicketStatus } from '@prisma/client';
import { notFoundError, invalidDataError, unauthorizedError } from '@/errors';
import { CreateTicket } from '@/protocols';
import { enrollmentRepository } from '@/repositories/enrollments-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getTicketType() {
  const ticketTypes = await ticketsRepository.findTicketsTypes();
  return ticketTypes;
}

async function getTicketByUserId(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();
  
  return ticket;
}

async function createTicket(userId: number, ticketTypeId: number) {
  if (!ticketTypeId) throw invalidDataError('ticket type id');

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();
  
  const ticketData: CreateTicket = {
    enrollmentId: enrollment.id,
    ticketTypeId,
    status: TicketStatus.RESERVED
  }

  const ticket = await ticketsRepository.createTicket(ticketData);
  return ticket;
}

const ticketService = { getTicketType, getTicketByUserId, createTicket };

export default ticketService;
