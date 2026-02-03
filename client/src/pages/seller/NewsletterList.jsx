import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

const NewsletterList = () => {

    const { axios, isDemoSeller } = useAppContext()
    const [emailsList, setEmailsList] = useState([])
    const fetchEmails = async () => {
        try {
            const { data } = await axios.get('/api/newsletter/list')
            if (data.success) {
                setEmailsList(data.emails)
            } else { toast.error(data.message) }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchEmails()
    }, [])

    const toggleActive = async (id) => {
        if (isDemoSeller) {
            toast.error("Demo-Modus: Änderungen nicht erlaubt");
            return;
        }
        try {
            const { data } = await axios.patch(`/api/newsletter/toggle/${id}`)
            if (data.success) {
                setEmailsList(prev =>
                    prev.map(email => (email._id === id ? { ...email, active: data.active } : email))
                )
                toast.success(data.message)
            } else toast.error(data.message)
        } catch (error) { toast.error(error.message) }
    }

    const handleDownload = async () => {
        if (isDemoSeller) {
            toast.error("Demo-Modus: Herunterladen nicht erlaubt");
            return;
        }

        try {
            const response = await fetch('/api/newsletter/download', {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Fehler beim Herunterladen');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'newsletter_emails.csv';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="flex-1 flex flex-col justify-between h-[95vh] overflow-y-scroll no-scrollbar">
            <div className="md:p-10 p-4 max-w-xl w-full">
                <div className="flex justify-between items-center pb-4">
                    <h2 className="text-sm md:text-lg font-medium">Newsletter-Abonnenten</h2>
                    <button
                        type='submit'
                        disabled={isDemoSeller}
                        onClick={handleDownload}
                        className="px-4 py-2.5 bg-primary hover:bg-dark-green
                 text-white text-sm md:text-lg font-medium rounded-lg cursor-pointer">CSV heruterladen</button>
                </div>

                <div className="flex flex-col max-w-xl w-full overflow-hidden rounded-md bg-white border border-dark-green/40">
                    <table className="md:table-auto table-fixed overflow-hidden">
                        <thead className="text-dark-green max-[500px]:text-xs md:text-base ">
                            <tr>
                                <th className="px-4 py-3 text-start w-[80%]">Email</th>
                                <th className="px-4 py-3 text-end w-[20%]">CSV-Export</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-black">
                            {emailsList.map((item) => (
                                <tr key={item._id} className="border-t max-[500px]:text-xs md:text-base border-dark-green/40 ">
                                    <td className="px-4 py-3 w-[80%] break-all">
                                        {item.email}
                                    </td>
                                    <td className="px-4 py-3 w-[20%] text-end">
                                        <div className="inline-flex justify-end">
                                            <label className="relative inline-flex cursor-pointer text-gray-900 gap-3">
                                                <input
                                                    onChange={() => toggleActive(item._id)}
                                                    checked={item.active}
                                                    type="checkbox"
                                                    className="sr-only peer" />

                                                <div className="w-12 h-7 bg-primary/20 border border-dark-green/40
                                            rounded-full peer peer-checked:bg-dark-green transition-colors duration-200"></div>
                                                <span className="dot absolute left-1 top-1 w-5 h-5 bg-white 
                                            border border-dark-green/40 rounded-full transition-transform
                                            duration-200 ease-in-out peer-checked:translate-x-5"></span>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default NewsletterList