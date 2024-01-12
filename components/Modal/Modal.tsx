interface ModalProps {
    isOpen: boolean;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-auto bg-neutral-900 bg-opacity-50 flex items-center justify-center">
                    <div className="relative modal-container px-5 py-3 bg-white w-96 max-w-full mx-auto rounded-lg">
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
