interface JWT {
  accessToken: string;
  accessExpriedDate: Date;
  refreshToken: string;
  refreshExpiredDate: Date | undefined;
}

export default JWT;
