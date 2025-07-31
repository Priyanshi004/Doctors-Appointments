'use client';
import React, { useState, useEffect } from 'react';

import { Appointment } from '@/types/appointment';
import AddAppointmentModal from './AddAppointmentModal';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const timeSlots = Array.from({ length: 9 }, (_, i) => `${9 + i}:00`);

const CalendarGrid = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; time: string } | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const res = await fetch('/api/appointments');
    const data = await res.json();
    setAppointments(data);
  };

  const handleSlotClick = (day: string, time: string) => {
    setSelectedSlot({ day, time });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedSlot(null);
    fetchAppointments();
  };

  const handleDelete = async (id: string) => {
    await fetch('/api/appointments', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    fetchAppointments();
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-8 gap-px border border-gray-200">
        <div className="bg-gray-100 text-center font-bold p-2">Time / Day</div>
        {days.map(day => (
          <div key={day} className="bg-gray-100 text-center font-bold p-2">{day}</div>
        ))}
        {timeSlots.map(time => (
          <React.Fragment key={time}>
            <div className="bg-gray-100 text-center p-2 font-medium">{time}</div>
            {days.map(day => {
              const appt = appointments.find(a => a.date === day && a.time === time);
              return (
                <div
                  key={day + time}
                  className="border text-sm p-2 hover:bg-blue-100 cursor-pointer relative"
                  onClick={() => handleSlotClick(day, time)}
                >
                  {appt ? (
                    <div>
                      <div>{appt.patientName}</div>
                      <div className="text-xs">{appt.patientMobile}</div>
                      <button onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(appt.id);
                      }} className="text-red-500 text-xs mt-1 underline">Delete</button>
                    </div>
                  ) : (
                    <span className="text-gray-400 italic">+ Add</span>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {isModalOpen && selectedSlot && (
        <AddAppointmentModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          selectedDay={selectedSlot.day}
          selectedTime={selectedSlot.time}
        />
      )}
    </div>
  );
};

export default CalendarGrid;
