interface ModalProps {
    isOpen: boolean;
    children: React.ReactNode;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children, onClose }) => {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-auto bg-neutral-900 bg-opacity-80 flex items-center justify-center">
                    <div className=" relative p-5 bg-neutral-800 rounded-lg">
                        <button className="font-int_med absolute right-10 text-3xl text-neutral-300 " onClick={onClose}>
                            x
                        </button>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
