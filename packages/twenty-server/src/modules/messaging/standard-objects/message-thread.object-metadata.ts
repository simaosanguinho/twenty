import { Relation } from 'src/engine/workspace-manager/workspace-sync-metadata/interfaces/relation.interface';

import {
  RelationMetadataType,
  RelationOnDeleteAction,
} from 'src/engine/metadata-modules/relation-metadata/relation-metadata.entity';
import { MESSAGE_THREAD_STANDARD_FIELD_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
import { STANDARD_OBJECT_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';
import { MessageChannelMessageAssociationObjectMetadata } from 'src/modules/messaging/standard-objects/message-channel-message-association.object-metadata';
import { MessageObjectMetadata } from 'src/modules/messaging/standard-objects/message.object-metadata';
import { BaseWorkspaceEntity } from 'src/engine/twenty-orm/base.workspace-entity';
import { WorkspaceEntity } from 'src/engine/twenty-orm/decorators/workspace-object.decorator';
import { WorkspaceIsNotAuditLogged } from 'src/engine/twenty-orm/decorators/workspace-is-not-audit-logged.decorator';
import { WorkspaceIsSystem } from 'src/engine/twenty-orm/decorators/workspace-is-system.decorator';
import { WorkspaceIsNullable } from 'src/engine/twenty-orm/decorators/workspace-is-nullable.decorator';
import { WorkspaceRelation } from 'src/engine/twenty-orm/decorators/workspace-relation.decorator';

@WorkspaceEntity({
  standardId: STANDARD_OBJECT_IDS.messageThread,
  namePlural: 'messageThreads',
  labelSingular: 'Message Thread',
  labelPlural: 'Message Threads',
  description: 'Message Thread',
  icon: 'IconMessage',
})
@WorkspaceIsNotAuditLogged()
@WorkspaceIsSystem()
export class MessageThreadObjectMetadata extends BaseWorkspaceEntity {
  @WorkspaceRelation({
    standardId: MESSAGE_THREAD_STANDARD_FIELD_IDS.messages,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Messages',
    description: 'Messages from the thread.',
    icon: 'IconMessage',
    inverseSideTarget: () => MessageObjectMetadata,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  @WorkspaceIsNullable()
  messages: Relation<MessageObjectMetadata[]>;

  @WorkspaceRelation({
    standardId:
      MESSAGE_THREAD_STANDARD_FIELD_IDS.messageChannelMessageAssociations,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Message Channel Association',
    description: 'Messages from the channel',
    icon: 'IconMessage',
    inverseSideTarget: () => MessageChannelMessageAssociationObjectMetadata,
    onDelete: RelationOnDeleteAction.RESTRICT,
  })
  @WorkspaceIsNullable()
  messageChannelMessageAssociations: Relation<
    MessageChannelMessageAssociationObjectMetadata[]
  >;
}
