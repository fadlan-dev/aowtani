"use client";
import {
  Container,
  Title,
  Text,
  Paper,
  Anchor,
  TextInput,
  PasswordInput,
  Group,
  Checkbox,
  Button,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { z } from "zod";
import {
  AdminMasterIcon,
  GuideIcon,
  OrganizationIcon,
  PartnerIcon,
  UserIcon,
} from "../Icons";

type Props = {
  p?: number;
};

const SignInForm = ({ p }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callback") || "/";
  const [error, setError] = useState("");
  const [general, setGeneral] = useState(false);

  const schema = z.object({
    username: z.string().min(1, { message: "Please input your username" }),
    password: z.string().min(6, { message: "Please input your password" }),
  });

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: zodResolver(schema),
  });

  return (
    <Container size={420} className="w-full" mb="lg">
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        เข้าสู่ระบบ
      </Title>
      {general && (
        <Text color="dimmed" size="sm" align="center" mt={5}>
          ยังไม่มีบัญชีใช่หรือไม่?{" "}
          <Anchor
            size="sm"
            component="button"
            onClick={() => router.push("/sign-up")}
          >
            ลงทะเบียน
          </Anchor>
        </Text>
      )}
      {error && (
        <Text align="center" c="red">
          {error}
        </Text>
      )}

      <Group className="pt-6 md:px-3">
        <ul className="flex items-center justify-between w-full">
          <li>
            <a
              href="https://master.admin.aowtani.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-black gap-1"
            >
              <div className="w-[46px] h-[46px] bg-[#D9D9D9] rounded-full flex items-center justify-center">
                <AdminMasterIcon />
              </div>
              <span className="text-sm hidden md:block">แอดมิน</span>
            </a>
          </li>
          <li>
            <a
              href="https://organization.admin.aowtani.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-black gap-1"
            >
              <div className="w-[46px] h-[46px] bg-[#D9D9D9] rounded-full flex items-center justify-center">
                <OrganizationIcon />
              </div>
              <span className="text-sm hidden md:block">องค์กร</span>
            </a>
          </li>
          <li>
            <a
              href="https://partners.admin.aowtani.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-black gap-1"
            >
              <div className="w-[46px] h-[46px] bg-[#D9D9D9] rounded-full flex items-center justify-center">
                <PartnerIcon />
              </div>
              <span className="text-sm hidden md:block">ผู้ประกอบการ</span>
            </a>
          </li>
          <li>
            <a
              href="https://localguide.admin.aowtani.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-black gap-1"
            >
              <div className="w-[46px] h-[46px] bg-[#D9D9D9] rounded-full flex items-center justify-center">
                <GuideIcon />
              </div>
              <span className="text-sm hidden md:block">ไกด์ท้องถิ่น</span>
            </a>
          </li>
          <li>
            <a
              onClick={() => setGeneral(!general)}
              className="flex flex-col items-center text-black gap-1"
            >
              <div className="w-[46px] h-[46px] bg-[#D9D9D9] rounded-full flex items-center justify-center">
                <UserIcon />
              </div>
              <span className="text-sm hidden md:block">ผู้ใช้ทั่วไป</span>
            </a>
          </li>
        </ul>
      </Group>
      {general && (
        <Paper mt={30} p={p}  radius="md">
          <form
            onSubmit={form.onSubmit(async (values) => {
              const res = await signIn("credentials", {
                ...values,
                callbackUrl: `${callbackUrl}`,
                redirect: false,
              });
              console.log("signIn", res);
              if (res?.error) {
                setError(res.error);
                console.error(res);
                return;
              }
              router.push(`${callbackUrl}`);
            })}
          >
            <TextInput
              label="อีเมล์"
              placeholder="กรอกอีเมล์"
              {...form.getInputProps("username")}
            />
            <PasswordInput
              label="รหัสผ่าน"
              placeholder="กรอกรหัสผ่าน"
              mt="md"
              {...form.getInputProps("password")}
            />
            <Group position="apart" mt="lg">
              {/* <Checkbox label="จดจำการเข้าสู่ระบบ" /> */}
              {/* <Anchor
              component='button'
              size='sm'
              onClick={() => router.push('forgotpassword')}
            >
              Forgot password?
            </Anchor> */}
            </Group>
            <Button fullWidth mt="xl" type="submit">
              เข้าสู่ระบบ
            </Button>
          </form>
        </Paper>
      )}
    </Container>
  );
};

export default SignInForm;
