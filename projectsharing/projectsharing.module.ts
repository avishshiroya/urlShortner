import { Module } from '@nestjs/common';
import { ProjectsharingService } from './projectsharing.service';
import { ProjectsharingController } from './projectsharing.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSharing, ProjectSharingSchema } from './entities/projectsharing.entity';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { Project, ProjectSchema } from 'src/project/entities/project.entity';
import { JwtService } from '@nestjs/jwt';
import { Organization, OrganizationSchema } from 'src/organization/entities/organization.entity';
import { ClockOut, ClockOutSchema } from 'src/clock-out/entities/clock-out.entity';
import { Notification, NotificationSchema } from 'src/notification/entities/notification.entity';
import { ClockIn, ClockInSchema } from 'src/clock-in/entities/clock-in.entity';
import { ProjectMember, ProjectMemberSchema } from 'src/project/entities/project-member.entity';
import { OrganizationReationshipSchema, OrganizationRelationship } from 'src/organization-relationship/entities/organization-relationship.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ProjectSharing.name, schema: ProjectSharingSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    MongooseModule.forFeature([{ name: Organization.name, schema: OrganizationSchema }]),
    MongooseModule.forFeature([{ name: ClockOut.name, schema: ClockOutSchema }]),
    MongooseModule.forFeature([{ name: ClockIn.name, schema: ClockInSchema }]),
    MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }]),
    MongooseModule.forFeature([{ name: ProjectMember.name, schema: ProjectMemberSchema }]),
    MongooseModule.forFeature([{ name: OrganizationRelationship.name, schema: OrganizationReationshipSchema }]),
  ],
  controllers: [ProjectsharingController],
  providers: [ProjectsharingService,JwtService],
})
export class ProjectsharingModule { }
