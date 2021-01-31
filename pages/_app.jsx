import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AuthProvider from '../src/context-providers/auth-provider';
import PageLayout from '../src/components/page-layout';

function MyApp({ Component, pageProps, router }) {
  return (
    <AuthProvider>
      <PageLayout>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={router.route}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </PageLayout>
    </AuthProvider>
  );
}

export default MyApp;
