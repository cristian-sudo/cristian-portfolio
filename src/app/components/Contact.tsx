import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type FormData = {
    name: string;
    email: string;
    message: string;
    companyName: string;
    salary: string;
    stack: string;
    remote: boolean;
    location: string;
    description: string;
    budget: string;
    timeConstraints: string;
};

export default function Contact() {
    const [formType, setFormType] = useState("general");
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        message: "",
        companyName: "",
        salary: "",
        stack: "",
        remote: false,
        location: "",
        description: "",
        budget: "",
        timeConstraints: "",
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showComponent, setShowComponent] = useState(true);

    const validate = () => {
        const newErrors: Partial<FormData> = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (formType === "general" && !formData.message) newErrors.message = "Message is required";
        if (formType === "recruiter") {
            if (!formData.companyName) newErrors.companyName = "Company Name is required";
            if (!formData.salary) newErrors.salary = "Salary is required";
            if (!formData.stack) newErrors.stack = "Stack is required";
            if (!formData.remote && !formData.location) newErrors.location = "Location is required";
        }
        if (formType === "freelance") {
            if (!formData.description) newErrors.description = "Description is required";
            if (!formData.budget) newErrors.budget = "Budget is required";
            if (!formData.timeConstraints) newErrors.timeConstraints = "Time constraints are required";
        }
        return newErrors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);

        const filteredData = Object.fromEntries(
            Object.entries(formData).filter(([, value]) => value !== "" && value !== false)
        );

        const dataToSend = {
            ...filteredData,
            formType,
            access_key: "9bed3129-8d2d-40fd-a6ad-fc2684679f25",
        };

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(dataToSend),
        });

        const result = await response.json();
        setIsSubmitting(false);

        if (result.success) {
            setIsSubmitted(true);
        }
    };

    useEffect(() => {
        if (isSubmitted) {
            const timer = setTimeout(() => {
                setShowComponent(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isSubmitted]);

    if (!showComponent) return null;

    return (
        <div className="flex flex-col justify-center items-center min-h-16 bg-black text-white mx-3 md:mx-0">
            <div className="flex space-x-4 mb-6">
                <button
                    className={`px-4 py-2 rounded ${formType === "general" ? "bg-accent" : "bg-gray-700"}`}
                    onClick={() => setFormType("general")}
                >
                    General
                </button>
                <button
                    className={`px-4 py-2 rounded ${formType === "recruiter" ? "bg-accent" : "bg-gray-700"}`}
                    onClick={() => setFormType("recruiter")}
                >
                    Recruiter
                </button>
                <button
                    className={`px-4 py-2 rounded ${formType === "freelance" ? "bg-accent" : "bg-gray-700"}`}
                    onClick={() => setFormType("freelance")}
                >
                    Freelance
                </button>
            </div>

            {!isSubmitted ? (
                <form className="w-full max-w-lg p-6 space-y-4 bg-gray-900 rounded-lg shadow-lg" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium" htmlFor="name">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            className={`w-full p-2 mt-1 bg-black border-2 rounded-md focus:outline-none focus:ring-2 transition-all duration-300 ${
                                errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-accent"
                            }`}
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            maxLength={255}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium" htmlFor="email">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            className={`w-full p-2 mt-1 bg-black border-2 rounded-md focus:outline-none focus:ring-2 transition-all duration-300 ${
                                errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-accent"
                            }`}
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            maxLength={255}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    {formType === "general" && (
                        <div>
                            <label className="block text-sm font-medium" htmlFor="message">
                                Message <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                className={`w-full p-2 mt-1 bg-black border-2 rounded-md focus:outline-none focus:ring-2 transition-all duration-300 ${
                                    errors.message ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-accent"
                                }`}
                                name="message"
                                id="message"
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                maxLength={500}
                            />
                            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                        </div>
                    )}

                    {formType === "recruiter" && (
                        <>
                            <div>
                                <label className="block text-sm font-medium" htmlFor="companyName">
                                    Company Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className={`w-full p-2 mt-1 bg-black border-2 rounded-md focus:outline-none focus:ring-2 transition-all duration-300 ${
                                        errors.companyName ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-accent"
                                    }`}
                                    type="text"
                                    name="companyName"
                                    id="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    maxLength={255}
                                />
                                {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium" htmlFor="salary">
                                    Salary <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className={`w-full p-2 mt-1 bg-black border-2 rounded-md focus:outline-none focus:ring-2 transition-all duration-300 ${
                                        errors.salary ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-accent"
                                    }`}
                                    type="text"
                                    name="salary"
                                    id="salary"
                                    value={formData.salary}
                                    onChange={handleChange}
                                    maxLength={255}
                                />
                                {errors.salary && <p className="text-red-500 text-sm mt-1">{errors.salary}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium" htmlFor="stack">
                                    Stack <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className={`w-full p-2 mt-1 bg-black border-2 rounded-md focus:outline-none focus:ring-2 transition-all duration-300 ${
                                        errors.stack ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-accent"
                                    }`}
                                    type="text"
                                    name="stack"
                                    id="stack"
                                    value={formData.stack}
                                    onChange={handleChange}
                                    maxLength={255}
                                />
                                {errors.stack && <p className="text-red-500 text-sm mt-1">{errors.stack}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium my-3" htmlFor="remote">
                                    Remote <span className="text-red-500">*</span>
                                </label>
                                <div className="flex items-center space-x-4">
                                    <label>
                                        <input
                                            className={`mr-1`}
                                            type="radio"
                                            name="remote"
                                            value="true"
                                            checked={formData.remote === true}
                                            onChange={() => setFormData({ ...formData, remote: true })}
                                        />
                                        Yes
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            className={`mr-1`}
                                            name="remote"
                                            value="false"
                                            checked={formData.remote === false}
                                            onChange={() => setFormData({ ...formData, remote: false })}
                                        />
                                        No
                                    </label>
                                </div>
                                {errors.remote && <p className="text-red-500 text-sm mt-1">{errors.remote}</p>}
                            </div>
                            {!formData.remote && (
                                <div>
                                    <label className="block text-sm font-medium" htmlFor="location">
                                        Location <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className={`w-full p-2 mt-1 bg-black border-2 rounded-md focus:outline-none focus:ring-2 transition-all duration-300 ${
                                            errors.location ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-accent"
                                        }`}
                                        type="text"
                                        name="location"
                                        id="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        maxLength={255}
                                    />
                                    {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                                </div>
                            )}
                        </>
                    )}

                    {formType === "freelance" && (
                        <>
                            <div>
                                <label className="block text-sm font-medium" htmlFor="description">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    className={`w-full p-2 mt-1 bg-black border-2 rounded-md focus:outline-none focus:ring-2 transition-all duration-300 ${
                                        errors.description ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-accent"
                                    }`}
                                    name="description"
                                    id="description"
                                    rows={4}
                                    value={formData.description}
                                    onChange={handleChange}
                                    maxLength={500}
                                />
                                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium" htmlFor="budget">
                                    Budget <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className={`w-full p-2 mt-1 bg-black border-2 rounded-md focus:outline-none focus:ring-2 transition-all duration-300 ${
                                        errors.budget ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-accent"
                                    }`}
                                    type="text"
                                    name="budget"
                                    id="budget"
                                    value={formData.budget}
                                    onChange={handleChange}
                                    maxLength={255}
                                />
                                {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium" htmlFor="timeConstraints">
                                    Time Constraints <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className={`w-full p-2 mt-1 bg-black border-2 rounded-md focus:outline-none focus:ring-2 transition-all duration-300 ${
                                        errors.timeConstraints ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-accent"
                                    }`}
                                    type="text"
                                    name="timeConstraints"
                                    id="timeConstraints"
                                    value={formData.timeConstraints}
                                    onChange={handleChange}
                                    maxLength={255}
                                />
                                {errors.timeConstraints && <p className="text-red-500 text-sm mt-1">{errors.timeConstraints}</p>}
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        className="w-full py-2 mt-3 bg-accent rounded-md text-white font-semibold hover:bg-accent-dark transition-all duration-300"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Submit Form"}
                    </button>
                </form>
            ) : (
                <div className="flex flex-col items-center space-y-4">
                    <motion.div
                        animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <Image src={'plane.svg'} alt={'plane'} width={200} height={200}/>
                    </motion.div>
                    <p className="text-lg font-semibold">Thank you for reaching out! We will get back to you soon.</p>
                </div>
            )}
        </div>
    );
}