'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const PatientDetailsPage = () => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    problem: '',
    relation: '',
    mobile: '',
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [modalType, setModalType] = useState<'error' | 'confirm' | null>(null); // ⬅️ updated state
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleGenderSelect = (gender: string) => {
    setForm({ ...form, gender });
  };

  const validate = () => {
    const newErrors: string[] = [];
    if (!form.name.trim()) newErrors.push('Name is required');
    if (!form.age.trim()) newErrors.push('Age is required');
    if (!form.mobile.trim()) newErrors.push('Mobile number is required');
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      setModalType('error'); // ⬅️ show error modal
      return;
    }
    setModalType('confirm'); // ⬅️ show confirmation modal
  };

  const confirmBooking = () => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const newBooking = {
      ...form,
      date: new Date().toLocaleString(),
    };
    localStorage.setItem('bookings', JSON.stringify([...bookings, newBooking]));
    router.push('/appointments');
  };

  return (
    <div className="min-h-screen bg-white px-4 py-6">
      <h2 className="text-xl font-semibold text-sky-600 mb-4">Patient Details (Optional)</h2>

      <div className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Patient Name"
          className="w-full p-3 border border-gray-300 rounded-md"
          value={form.name}
          onChange={handleChange}
        />

        <div className="flex gap-3">
          <input
            type="number"
            name="age"
            placeholder="Age"
            className="w-1/3 p-3 border border-gray-300 rounded-md"
            value={form.age}
            onChange={handleChange}
          />

          <div className="flex-1 flex gap-2">
            {['Male', 'Female', 'Other'].map((g) => (
              <button
                key={g}
                onClick={() => handleGenderSelect(g)}
                className={`flex-1 p-3 rounded-md border ${
                  form.gender === g
                    ? 'bg-sky-500 text-white border-sky-500'
                    : 'border-gray-300 text-gray-700'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <textarea
          name="problem"
          placeholder="Write your problem"
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-md"
          value={form.problem}
          onChange={handleChange}
        />

        <input
          type="text"
          name="relation"
          placeholder="Brother/sister/mother"
          className="w-full p-3 border border-gray-300 rounded-md"
          value={form.relation}
          onChange={handleChange}
        />

        <input
          type="tel"
          name="mobile"
          placeholder="Mobile number"
          className="w-full p-3 border border-gray-300 rounded-md"
          value={form.mobile}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col mt-8 gap-4">
        <button className="border border-sky-500 text-sky-500 font-semibold py-3 rounded-md">
          Make Payment
        </button>
        <button
          onClick={handleSubmit}
          className="bg-sky-500 text-white font-semibold py-3 rounded-md"
        >
          Add Patient Details
        </button>
      </div>

      {/* 🧠 Modal for error or confirmation */}
      {modalType && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-sm">
            {modalType === 'error' ? (
              <>
                <h3 className="text-lg font-semibold mb-4 text-red-600">Booking Failed</h3>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  {errors.map((err, index) => (
                    <li key={index}>{err}</li>
                  ))}
                </ul>
                <button
                  className="mt-6 w-full bg-sky-500 text-white py-2 rounded-md"
                  onClick={() => setModalType(null)}
                >
                  Close
                </button>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-4 text-sky-600">Confirm Booking</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Are you sure you want to add this patient and proceed to appointments?
                </p>
                <div className="flex gap-4">
                  <button
                    className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-md"
                    onClick={() => setModalType(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-1 bg-sky-500 text-white py-2 rounded-md"
                    onClick={confirmBooking}
                  >
                    Confirm
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDetailsPage;