'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { properties } from '@/lib/data/properties';
import { pick } from '@/lib/locale';

function buildSchema(t: (key: string) => string) {
  return z.object({
    name: z.string().min(2, t('contact.form.errors.nameRequired')),
    email: z.string().email(t('contact.form.errors.emailInvalid')).min(1, t('contact.form.errors.emailRequired')),
    phone: z.string().optional(),
    apartment: z.string().optional(),
    checkin: z.string().optional(),
    checkout: z.string().optional(),
    guests: z.string().optional(),
    message: z.string().min(10, t('contact.form.errors.messageRequired')),
  });
}

type FormValues = z.infer<ReturnType<typeof buildSchema>>;

function InputField({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-brand-navy mb-1.5">
        {label}
        {required && <span className="text-brand-gold ml-1" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
          <AlertCircle size={14} />
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  'w-full px-4 py-3 border border-brand-sand rounded-lg text-brand-navy text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold transition-colors duration-150 bg-white';

export default function ContactForm() {
  const t = useTranslations();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const prefilledApartment = searchParams.get('appartamento') || '';

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const schema = buildSchema((key) => t(key as Parameters<typeof t>[0]));
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { apartment: prefilledApartment },
  });

  useEffect(() => {
    if (prefilledApartment) setValue('apartment', prefilledApartment);
  }, [prefilledApartment, setValue]);

  async function onSubmit(data: FormValues) {
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error('Network error');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <CheckCircle size={48} className="text-brand-gold mb-4" />
        <p className="font-serif text-brand-navy text-xl">{t('contact.form.success')}</p>
      </div>
    );
  }

  const tf = (key: string) => t(`contact.form.${key}` as Parameters<typeof t>[0]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <InputField label={tf('name')} error={errors.name?.message} required>
          <input
            {...register('name')}
            type="text"
            placeholder={tf('namePlaceholder')}
            className={inputClass}
            aria-required="true"
            autoComplete="name"
          />
        </InputField>

        <InputField label={tf('email')} error={errors.email?.message} required>
          <input
            {...register('email')}
            type="email"
            placeholder={tf('emailPlaceholder')}
            className={inputClass}
            aria-required="true"
            autoComplete="email"
          />
        </InputField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <InputField label={tf('phone')} error={errors.phone?.message}>
          <input
            {...register('phone')}
            type="tel"
            placeholder={tf('phonePlaceholder')}
            className={inputClass}
            autoComplete="tel"
          />
        </InputField>

        <InputField label={tf('apartment')} error={errors.apartment?.message}>
          <select {...register('apartment')} className={inputClass}>
            <option value="">{tf('apartmentDefault')}</option>
            <option value="general">{tf('apartmentGeneral')}</option>
            {properties.map((p) => (
              <option key={p.slug} value={p.slug}>
                {pick(p.name, locale)}
              </option>
            ))}
          </select>
        </InputField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <InputField label={tf('checkin')} error={errors.checkin?.message}>
          <input {...register('checkin')} type="date" className={inputClass} />
        </InputField>

        <InputField label={tf('checkout')} error={errors.checkout?.message}>
          <input {...register('checkout')} type="date" className={inputClass} />
        </InputField>

        <InputField label={tf('guests')} error={errors.guests?.message}>
          <select {...register('guests')} className={inputClass}>
            <option value="">—</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </InputField>
      </div>

      <InputField label={tf('message')} error={errors.message?.message} required>
        <textarea
          {...register('message')}
          rows={5}
          placeholder={tf('messagePlaceholder')}
          className={`${inputClass} resize-none`}
          aria-required="true"
        />
      </InputField>

      {status === 'error' && (
        <p role="alert" className="text-sm text-red-600 flex items-center gap-2">
          <AlertCircle size={16} />
          {tf('error')}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-glass btn-glass-md btn-glass-gold w-full sm:w-auto font-semibold tracking-wide disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {status === 'loading' ? (
          <>
            <span className="w-4 h-4 border-2 border-brand-navy/30 border-t-brand-navy rounded-full animate-spin" />
            {tf('submitting')}
          </>
        ) : (
          <>
            <Send size={16} />
            {tf('submit')}
          </>
        )}
      </button>
    </form>
  );
}
