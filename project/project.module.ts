import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { Project, ProjectSchema } from './entities/project.entity';
import { JwtService } from '@nestjs/jwt';
import { ClockIn, ClockInSchema } from 'src/clock-in/entities/clock-in.entity';
import { ClockOut, ClockOutSchema } from 'src/clock-out/entities/clock-out.entity';
import { ProjectMember, ProjectMemberSchema } from './entities/project-member.entity';
import { Organization, OrganizationSchema } from 'src/organization/entities/organization.entity';
import { ProjectSharing, ProjectSharingSchema } from 'src/projectsharing/entities/projectsharing.entity';
import { Notification, NotificationSchema } from 'src/notification/entities/notification.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: ClockOut.name, schema: ClockOutSchema }]),
    MongooseModule.forFeature([{ name: ClockIn.name, schema: ClockInSchema }]),
    MongooseModule.forFeature([{ name: ProjectMember.name, schema: ProjectMemberSchema }]),
    MongooseModule.forFeature([{ name: Organization.name, schema: OrganizationSchema }]),
    MongooseModule.forFeature([{ name: ProjectSharing.name, schema: ProjectSharingSchema }]),
    MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService,JwtService],
})
export class ProjectModule {}
