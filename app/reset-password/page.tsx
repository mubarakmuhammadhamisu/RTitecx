'use client';

import { Suspense, useState } from 'react';
import { useRecoveryFlowDetection } from '@/lib/forms/useRecoveryFlowDetection';
import AuthPageLoadingFallback from '@/components/auth/AuthPageLoadingFallback';
import TokenExpiredScreen from './_screens/TokenExpiredScreen';
import SetNewPasswordScreen from './_screens/SetNewPasswordScreen';
import PasswordUpdatedScreen from './_screens/PasswordUpdatedScreen';
import RequestResetFormScreen from './_screens/RequestResetFormScreen';
import ResetEmailSentScreen from './_screens/ResetEmailSentScreen';

/**
 * ResetPasswordContent — the state machine orchestrator. Each branch
 * renders one dedicated screen component; this file's only job is
 * deciding WHICH screen, not rendering any of them itself.
 */
function ResetPasswordContent() {
  const { isRecoveryFlow, tokenExpired, setTokenExpired } = useRecoveryFlowDetection();
  const [pwDone, setPwDone] = useState(false);
  const [sentToEmail, setSentToEmail] = useState<string | null>(null);

  if (tokenExpired) {
    return <TokenExpiredScreen onRequestNew={() => setTokenExpired(false)} />;
  }

  if (isRecoveryFlow && pwDone) {
    return <PasswordUpdatedScreen />;
  }

  if (isRecoveryFlow) {
    return <SetNewPasswordScreen onSuccess={() => setPwDone(true)} />;
  }

  if (sentToEmail) {
    return <ResetEmailSentScreen email={sentToEmail} />;
  }

  return <RequestResetFormScreen onEmailSent={setSentToEmail} />;
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<AuthPageLoadingFallback />}>
      <ResetPasswordContent />
    </Suspense>
  );
}
