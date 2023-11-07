'use client';

import {
  Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useUtils } from '@/app/providers/UtilsContext';

export default function Login() {
  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onOpenChange: onOpenChangeLogin,
  } = useDisclosure();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { status } = useSession();
  const { toast } = useUtils();

  const handlelogin = async (onClose) => {
    const res = await signIn('credentials', { username, password, redirect: false });

    if (res.error) return toast.error('Invalid username or password');

    if (res.ok) {
      onClose();
      return router.push('/play');
    }

    return null;
  };

  useEffect(() => {
    if (status === 'authenticated') router.push('/play');
  }, [status, router]);

  useEffect(() => {
    onOpenLogin();
  }, []);
  return (
    <Modal
      isOpen={isOpenLogin}
      onOpenChange={onOpenChangeLogin}
      hideCloseButton
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-xl">
              Login
            </ModalHeader>
            <ModalBody>
              <p>Por favor ingresa un nombre de usuario y contraseña</p>
              <Input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                size="md"
                type="email"
                label="UserName"
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
            </ModalBody>
            <ModalFooter>
              <Button
                onPress={() => { onClose(); router.push('/play'); }}
              >
                Exit
              </Button>
              <Button
                onPress={() => { onClose(); router.push('/play/register'); }}
              >
                Or Register
              </Button>
              <Button
                disabled={username.length === 0 || password === 0}
                onPress={() => handlelogin(onClose)}
              >
                Login
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
