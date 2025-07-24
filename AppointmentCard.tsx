import Image from "next/image";

type Props = {
  appointment: {
    doctor: {
      name: string;
      specialty: string;
      imageUrl: string;
    };
    patientName: string;
    gender: string;
    date: string;
    time: string;
    reason: string;
  };
};

export default function AppointmentCard({ appointment }: Props) {
  const { doctor, date, time, patientName, reason, gender } = appointment;

  return (
    <div className="bg-white rounded-xl shadow p-4 flex gap-4">
      <Image
        src={doctor.imageUrl}
        alt={doctor.name}
        width={60}
        height={60}
        className="rounded-full object-cover"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{doctor.name}</h3>
        <p className="text-sm text-gray-600">{doctor.specialty}</p>
        <div className="text-sm mt-2 space-y-1">
          <p>
            <strong>Patient:</strong> {patientName} ({gender})
          </p>
          <p>
            <strong>Date:</strong> {date} &nbsp; | &nbsp; <strong>Time:</strong> {time}
          </p>
          <p>
            <strong>Reason:</strong> {reason}
          </p>
        </div>
      </div>
    </div>
  );
}
