import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

const NewsletterList = () => {

    const { axios, isDemoSeller } = useAppContext()
    const [emailsList, setEmailsList] = useState([])

    const fetchEmailsList = async () => {
        try {
            const { data } = await axios.get('/api/newsletter/list')
            if (data.success) {
                setEmailsList(data.emailsList)
            } else { toast.error(data.message) }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchEmailsList()
    }, [])

    const toggleActive = async (id, active) => {
        if (isDemoSeller) {
            toast.error("Demo-Modus: Änderungen nicht erlaubt");
            return;
        }
        try {
            const { data } = await axios.patch('/api/newsletter/toggle', {id, active})
            if (data.success) {
                fetchEmailsList()
                toast.success(data.message)
            } else toast.error(data.message)
        } catch (error) { toast.error("toggleActive fehler") }
    }

    const handleDownload = async () => {
        if (isDemoSeller) {
            toast.error("Demo-Modus: Herunterladen nicht erlaubt");
            return;
        }

        try {
            const response = await fetch('/api/newsletter/download', {
                method: 'GET',
                credentials: 'include', // Um Cookies (sellerToken) zu übermitteln
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
            <div className="md:p-10 p-4 max-w-4xl w-full">
                <div className="flex justify-between pb-4">
                    <h2 className="pb-4 text-sm md:text-lg font-medium">Alle Abonnenten</h2>
                    <button
                        type='submit'
                        disabled={isDemoSeller}
                        onClick={handleDownload}
                        className="px-4 py-2.5 bg-primary hover:bg-dark-green
                 text-white text-sm md:text-lg font-medium rounded-lg cursor-pointer">CSV heruterladen</button>
                </div>

                <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-dark-green/40">
                    <table className="md:table-auto table-fixed w-full overflow-hidden">
                        <thead className="text-dark-green max-[500px]:text-xs md:text-base ">
                            <tr>
                                <th className="px-8 py-3 font-semibold truncate text-start">Email</th>
                                <th className="px-8 py-3 font-semibold truncate text-end">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-black">
                            {emailsList.map((item) => (
                                <tr key={item._id} className="border-t border-dark-green/40">
                                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                                        <span className="truncate max-sm:hidden w-full">{item.email}</span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <label className="relative inline-flex items-end cursor-pointer text-gray-900 gap-3">
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