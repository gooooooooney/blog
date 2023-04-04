import { MENTION_TYPES } from "@/constants/notion/richTextTypes";
import { MentionRichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

interface MentionProps {
  mention: MentionRichTextItemResponse['mention']
}

const Mention: React.FC<MentionProps> = ({mention} : MentionProps ) => {

  // TODO: Implement mentions
  const renderMention = () => {
    switch (mention.type) {
      case MENTION_TYPES.Page:
        return null;
      case MENTION_TYPES.Database:
        return null;
      case MENTION_TYPES.Date:
        return null;
      case MENTION_TYPES.TemplateMention:

      default:
        return null;
    }
  }
  return (
    <div>
      {renderMention()}
    </div>
  );
};

export default Mention;
