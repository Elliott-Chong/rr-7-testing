import { useNavigate, useOutlet } from 'react-router-dom';
import { Dialog, DialogContent } from './ui/dialog';

type Props = {
    children: React.ReactNode;
}


export default function Modal({ children }: Props) {
    const navigate = useNavigate();
    const hasOutlet = !!useOutlet()

    return (
        <Dialog open={hasOutlet} onOpenChange={open => {
            if (!open) {
                navigate(-1);
            }
        }}>
            <DialogContent onClick={e => e.stopPropagation()}>
                {children}
            </DialogContent>
        </Dialog>
    );
}