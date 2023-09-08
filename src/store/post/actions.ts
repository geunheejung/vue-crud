import { ActionContext } from "vuex";
import { IRootState } from "@/store";
import { PostStateType } from "@/store/post";
import { MUTATION } from "@/store/post/mutations";
import { getPostList, setPost } from "@/api/post";
import createPost, { PostPayloadType } from "@/db/createPost";

export const ACTION = {
  FETCH_POST_LIST: "FETCH_POST_LIST",
  FETCH_SET_POST: "FETCH_SET_POST",
} as const;

const { FETCH_POST_LIST, FETCH_SET_POST } = ACTION;

type ContextType = ActionContext<PostStateType, IRootState>;

const actions = {
  async [FETCH_POST_LIST](context: ContextType) {
    /**
     * TODO: 게시글 API 요청 후 커밋
     * 1. 게시글 API 패치
     * 2. 패치 과정에서 발생하는 처리
     *  2.1 데이터가 저장 되었을 때
     *  2.2 데이터 저장 실패 했을 떄
     */
    try {
      const res = await getPostList();
      context.commit(MUTATION.SET_POST_LIST, { data: res.data });
    } catch (error) {
      throw new Error("[ERROR-ACTION], FETCH_POST_LIST" + error);
    }
  },
  async [FETCH_SET_POST](
    context: ContextType,
    payload: { data: PostPayloadType }
  ) {
    try {
      /**
       * TODO: 게시글 작성
       * 1. payload로 content, title을 받는다
       * 2. 게시글 작성 API를 요청한다.
       */

      const res = await setPost(payload.data);

      context.commit(MUTATION.SET_POST_LIST, { data: res.data });
    } catch (error) {
      throw new Error("[ERROR-ACTION], FETCH_SET_POST" + error);
    }
  },
};

export default actions;
