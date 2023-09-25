import { prisma } from '@/config';
import { CreateTicket } from '@/protocols';
import { Enrollment, Ticket, TicketType } from '@prisma/client';

export type TicketResponseWithEnrollment = {
    id: number;
    status: string;
    ticketTypeId: number;
    enrollmentId: number;
    TicketType: {
        id: number;
        name: string;
        price: number;
        isRemote: boolean;
        includesHotel: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
    Enrollment: Enrollment;
    createdAt: Date;
    updatedAt: Date;
};

async function findTicketsTypes(): Promise<TicketType[]> {
    return await prisma.ticketType.findMany();
}

async function findTicketByEnrollmentId(ticketId: number): Promise<TicketResponseWithEnrollment | null> {
    const ticket = await prisma.ticket.findFirst({
        where: { id: ticketId },
        include: {
            TicketType: true,
            Enrollment: true
        },
    });
    return ticket as TicketResponseWithEnrollment;
}

async function createTicket(ticketTypeId: number, enrollment: number): Promise<Ticket> {
    return await prisma.ticket.create({
        data: {
            ticketTypeId: ticketTypeId,
            enrollmentId: enrollment,
            status: "RESERVED",
        },
        include: { TicketType: true }
    })
}

async function findTicketById(ticketTypeId: number) {
    const result = await prisma.ticketType.findUnique({
        where: { id: ticketTypeId }
    })
    return result;
}

const ticketsRepository = { findTicketsTypes, findTicketByEnrollmentId, createTicket, findTicketById };

export default ticketsRepository;