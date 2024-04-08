import { createContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useContext } from 'react';

const SignupContext = createContext({});

const SignupContextProvider = ({children}) => {
    const schema = yup.object().shape({
        firstName: yup.string().required("First name Is Required"),
        lastName: yup.string().required("Last name Is Required"),
        email: yup.string().required("Email Is Required"),
        password: yup
          .string()
          .required("Password Is Required")
          .matches(
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
            "Password Must Contain An Uppercase, A Digit, and A Special Character"
          )
          .min(8, "Password Should Have At Least 8 Characters")
          .max(32, "Password Should Have At Most 32 Characters"),
        confirmPassword: yup
          .string()
          .required("Password Must Match")
          .oneOf([yup.ref("password"), null], "Password Must Match"),
        
        gender: yup.string().required("Gender is required"),
        dateOfBirth: yup.date().nullable().required("Date of Birth is required"),
        relationshipStatus: yup.string().required("Relationship Status is required"),
        existingMedicalConditions: yup.string().required("Existing Medical Conditions is required"),
        allergies: yup.string().required("Allergies is required"),
        profilePicture: yup.mixed().nullable().required("Profile picture is required"),
        phoneNumber: yup.string().required('Phone Number is required'),
        address: yup.string().required('Address is required'),
        emergencyContactName: yup.string().required('Emergency Contact Full Name is required'),
        emergencyContactNumber: yup.string().required('Emergency Contact Phone Number is required'),
        emergencyContactAddress: yup.string().required('Emergency Contact Address is required'),
        agreeToTerms: yup.boolean().oneOf([true], 'You must agree to the Terms and Conditions'),
    });
    const doctorSchema = yup.object().shape({
        firstName: yup.string().required("First name Is Required"),
        lastName: yup.string().required("Last name Is Required"),
        email: yup.string().required("Email Is Required"),
        password: yup
          .string()
          .required("Password Is Required")
          .matches(
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
            "Password Must Contain An Uppercase, A Digit, and A Special Character"
          )
          .min(8, "Password Should Have At Least 8 Characters")
          .max(32, "Password Should Have At Most 32 Characters"),
        confirmPassword: yup
          .string()
          .required("Password Must Match")
          .oneOf([yup.ref("password"), null], "Password must match"),
        
        gender: yup.string().required("Gender is required"),
        specialty: yup.string().required("Specialty is required"),
        profilePicture: yup.mixed().nullable().required("Profile picture is required"),
        phoneNumber: yup.string().required('Phone Number is required'),
        address: yup.string().required('Address is required'),
        agreeToTerms: yup.boolean().oneOf([true], 'You must agree to the Terms and Conditions'),
    });
    
    const forgotPasswordSchema = yup.object().shape({
        email: yup.string().required("Email Is Required"),
    });
    
    const resetPasswordSchema = yup.object().shape({
        newPassword: yup
          .string()
          .required("Password Is Required")
          .matches(
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
            "Password Must Contain An Uppercase, A Digit, and A Special Character"
          )
          .min(8, "Password Should Have At Least 8 Characters")
          .max(32, "Password Should Have At Most 32 Characters"),
        confirmPassword: yup
          .string()
          .required("Password Must Match")
          .oneOf([yup.ref("newPassword"), null], "Password must match"),
        
    });
    
    const forgotPasswordSchemaDoctor = yup.object().shape({
        email: yup.string().required("Email Is Required"),
    });
    
    const resetPasswordSchemaDoctor = yup.object().shape({
        newPassword: yup
          .string()
          .required("Password Is Required")
          .matches(
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
            "Password Must Contain An Uppercase, A Digit, and A Special Character"
          )
          .min(8, "Password Should Have At Least 8 Characters")
          .max(32, "Password Should Have At Most 32 Characters"),
        confirmPassword: yup
          .string()
          .required("Password Must Match")
          .oneOf([yup.ref("newPassword"), null], "Password must match"),
        
    });

    const defaultValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        dateOfBirth: null,
        relationshipStatus: "",
        existingMedicalConditions: "",
        allergies: "",
        profilePicture: "",
        phoneNumber: "",
        address: "",
        emergencyContactName: "",
        emergencyContactNumber: "",
        emergencyContactAddress: "",
        agreeToTerms: false,
    }
    
    const doctorDefaultValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        specialty: "",
        profilePicture: "",
        phoneNumber: "",
        address: "",
        agreeToTerms: false,
    }
    
    const forgotPasswordDefaultValues = {
        email: "",
    }
    
    const resetPasswordDefaultValues = {
        newPassword: "",
        confirmPassword: "",
    }
    const forgotPasswordDefaultValuesDoctor = {
        email: "",
    }
    
    const resetPasswordDefaultValuesDoctor = {
        newPassword: "",
        confirmPassword: "",
    }

    const { control, handleSubmit, formState: { errors }, trigger, watch, reset, setValue, getValues, unregister } = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
    });
    const { control: doctorControl, handleSubmit: doctorHandleSubmit, formState: { errors: doctorErrors }, trigger: doctorTrigger, watch: doctorWatch, reset: doctorReset, setValue: doctorSetValue, getValues: doctorGetValues, unregister: doctorUnregister } = useForm({
        resolver: yupResolver(doctorSchema),
        defaultValues: doctorDefaultValues,
    });
    const { control: forgotPasswordControl, handleSubmit: forgotPasswordHandleSubmit, formState: { errors: forgotPasswordErrors }, trigger: forgotPasswordTrigger, watch: forgotPasswordWatch, reset: forgotPasswordReset, setValue: forgotPasswordSetValue, getValues: forgotPasswordGetValues, unregister: forgotPasswordUnregister } = useForm({
        resolver: yupResolver(forgotPasswordSchema),
        defaultValues: forgotPasswordDefaultValues,
    });
    const { control: resetPasswordControl, handleSubmit: resetPasswordHandleSubmit, formState: { errors: resetPasswordErrors }, trigger: resetPasswordTrigger, watch: resetPasswordWatch, reset: resetPasswordReset, setValue: resetPasswordSetValue, getValues: resetPasswordGetValues, unregister: resetPasswordUnregister } = useForm({
        resolver: yupResolver(resetPasswordSchema),
        defaultValues: resetPasswordDefaultValues,
    });
    const { control: forgotPasswordControlDoctor, handleSubmit: forgotPasswordHandleSubmitDoctor, formState: { errors: forgotPasswordErrorsDoctor }, trigger: forgotPasswordTriggerDoctor, watch: forgotPasswordWatchDoctor, reset: forgotPasswordResetDoctor, setValue: forgotPasswordSetValueDoctor, getValues: forgotPasswordGetValuesDoctor, unregister: forgotPasswordUnregisterDoctor } = useForm({
        resolver: yupResolver(forgotPasswordSchemaDoctor),
        defaultValues: forgotPasswordDefaultValuesDoctor,
    });
    const { control: resetPasswordControlDoctor, handleSubmit: resetPasswordHandleSubmitDoctor, formState: { errors: resetPasswordErrorsDoctor }, trigger: resetPasswordTriggerDoctor, watch: resetPasswordWatchDoctor, reset: resetPasswordResetDoctor, setValue: resetPasswordSetValueDoctor, getValues: resetPasswordGetValuesDoctor, unregister: resetPasswordUnregisterDoctor } = useForm({
        resolver: yupResolver(resetPasswordSchemaDoctor),
        defaultValues: resetPasswordDefaultValuesDoctor,
    });

    return (
        <SignupContext.Provider value={{control, handleSubmit, errors, trigger, watch, reset, setValue, getValues, unregister, doctorControl, doctorHandleSubmit, doctorErrors, doctorTrigger, doctorWatch, doctorReset, doctorSetValue, doctorGetValues, doctorUnregister, forgotPasswordControl, forgotPasswordHandleSubmit, forgotPasswordErrors, forgotPasswordTrigger, forgotPasswordWatch, forgotPasswordReset, forgotPasswordSetValue, forgotPasswordGetValues, forgotPasswordUnregister, resetPasswordControl, resetPasswordHandleSubmit, resetPasswordErrors, resetPasswordTrigger, resetPasswordWatch, resetPasswordReset, resetPasswordSetValue, resetPasswordGetValues, resetPasswordUnregister, forgotPasswordControlDoctor, forgotPasswordHandleSubmitDoctor, forgotPasswordErrorsDoctor, forgotPasswordTriggerDoctor, forgotPasswordWatchDoctor, forgotPasswordResetDoctor, forgotPasswordSetValueDoctor, forgotPasswordGetValuesDoctor, forgotPasswordUnregisterDoctor, resetPasswordControlDoctor, resetPasswordHandleSubmitDoctor, resetPasswordErrorsDoctor, resetPasswordTriggerDoctor, resetPasswordWatchDoctor, resetPasswordResetDoctor, resetPasswordSetValueDoctor, resetPasswordGetValuesDoctor, resetPasswordUnregisterDoctor}}>
            {children}
        </SignupContext.Provider>
    )
} 

export const useSignupContext = () => {
    return useContext(SignupContext)
}


export { SignupContext, SignupContextProvider};
