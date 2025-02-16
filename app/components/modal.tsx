import { useNavigate } from 'react-router-dom';
import { type PropsWithChildren } from 'react';

export default function Modal({ children }: PropsWithChildren) {
    const navigate = useNavigate();

    return (
        <>
            {/* Modal backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => navigate(-1)}
            />

            {/* Modal content */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 z-50 w-full max-w-md">
                <div onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        </>
    );
}