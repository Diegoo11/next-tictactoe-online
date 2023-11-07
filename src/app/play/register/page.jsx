/* eslint-disable consistent-return */

'use client';

import {
  Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import axios from 'axios';
import { useUtils } from '@/app/providers/UtilsContext';

export default function Login() {
  const {
    isOpen: isOpenRegister,
    onOpen: onOpenRegister,
    onOpenChange: onOpenChangeRegister,
  } = useDisclosure();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const { toast } = useUtils();
  const { status } = useSession();

  const router = useRouter();

  //   if (isLogged()) router.push('/play');

  const handleRegister = async (onClose) => {
    if (username.length === 0 || password.length === 0) return toast.error('Completa los datos');
    if (password !== passwordAgain) return toast.error('Completa los datos');
    let res;
    try {
      res = await axios.post('/api/auth/signup', {
        username,
        password,
      });
      if (res.status === 200) {
        const resAuth = await signIn('credentials', { redirect: false, username, password });

        if (resAuth.error) return toast.error('Server error');
        if (resAuth.ok) {
          onClose();
          router.push('/play');
        }
      }
    } catch (err) {
      return toast.error(err?.response?.data?.error || 'Error');
    }
  };

  useEffect(() => {
    if (status === 'authenticated') router.push('/play');
  }, [status, router]);

  useEffect(() => {
    onOpenRegister();
  }, [onOpenRegister]);
  return (
    <Modal
      isOpen={isOpenRegister}
      onOpenChange={onOpenChangeRegister}
      hideCloseButton
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-xl">
              Register
            </ModalHeader>
            <ModalBody>
              <p>Bienvenido ingrese sus datos</p>
              <Input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                size="md"
                type="email"
                label="Username"
                maxLength={100}
              />
              <Input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                size="md"
                type="password"
                label="Password"
                maxLength={100}
                isRequired
              />
              <Input
                onChange={(e) => setPasswordAgain(e.target.value)}
                value={passwordAgain}
                size="md"
                type="password"
                label="Password again"
                maxLength={100}
                isRequired
              />
            </ModalBody>
            <ModalFooter>
              <Button
                onPress={() => { onClose(); router.push('/play'); }}
              >
                Exit
              </Button>
              <Button
                onPress={() => { onClose(); router.push('/play/login'); }}
              >
                Or Login
              </Button>
              <Button
                disabled={username.length === 0 || password === 0 || password !== passwordAgain}
                onPress={() => handleRegister(onClose)}
              >
                Register
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
