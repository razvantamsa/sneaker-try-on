import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";

import { PubSub } from "graphql-subscriptions";

export const pubSub = new PubSub();

@Injectable()
export class UtilsService {
  constructor(private readonly mailerService: MailerService, private readonly configService: ConfigService) {}

  async sendEmail(toEmail: string, subjectEmail: string, templateEmail: string, contextEmail: any): Promise<any> {
    try {
      await this.mailerService.sendMail({
        to: toEmail,
        from: this.configService.get("MAIL_NOREPLY"),
        subject: subjectEmail,
        template: templateEmail,
        context: contextEmail
      });
    } catch (err) {
      console.log(err);
    }
  }
}
