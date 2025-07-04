import { Alert, Snackbar } from "@mui/material";
import { createContext, useContext, useState } from "react";

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const showError = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    return (
        <ErrorContext.Provider value={{ showError }}>
            {children}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="error" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </ErrorContext.Provider>
    );
};

export const useErrorContext = () => useContext(ErrorContext);
