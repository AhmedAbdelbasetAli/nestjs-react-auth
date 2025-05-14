import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '../../utils/validators';
import * as yup from 'yup';


type FormData = yup.InferType<typeof signupSchema>;

interface SignupFormProps {
  onSubmit: (data: FormData) => void;
  error?: string | null;
  loading?: boolean;
}

export default function SignupForm({ onSubmit, error, loading }: SignupFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signupSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      <h2>Create an Account</h2>

      {error && <p className="form-error">{error}</p>}

      <input {...register('email')} placeholder="Email" />
      {errors.email && <span className="form-error">{errors.email.message?.toString()}</span>}

      <input {...register('name')} placeholder="Full Name" />
      {errors.name && <span className="form-error">{errors.name.message?.toString()}</span>}

      <input type="password" {...register('password')} placeholder="Password" />
      {errors.password && <span className="form-error">{errors.password.message?.toString()}</span>}

      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Register'}
      </button>
    </form>
  );
}