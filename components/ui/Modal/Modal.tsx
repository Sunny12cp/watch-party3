interface ModalProps {
    isOpen: boolean;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-auto bg-neutral-300 bg-opacity-50 flex items-center justify-center">
                    <div className="relative modal-container px-5 py-3 bg-white w-96 max-w-full mx-auto rounded-lg">
                        <div className="absolute top-0 right-0 p-4 cursor-pointer">&times;</div>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
