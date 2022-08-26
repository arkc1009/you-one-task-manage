import getDateDiff from '@lib/helpers/getDateDiff';
import progressToPercentage from '@lib/helpers/progressToPercentage';
import { TaskResponse } from '@lib/schema';
import { Progress } from '@prisma/client';
import ProgressBar from 'components/common/ProgressBar';
import { motion } from 'framer-motion';
import { useEffect, useMemo } from 'react';
import tw, { css } from 'twin.macro';

interface TaskProps {
  task: TaskResponse;
}

const labelColor = {
  READY: tw`bg-onlyOne3 bg-opacity-70`,
  GOING: tw`bg-onlyOne1 bg-opacity-90`,
  END: tw`bg-slate-300`,
};

const cardBorder = {
  READY: tw`border-2 border-gray-600 border-dashed`,
  GOING: tw`ring-2 ring-gray-600`,
  END: tw`ring-0`,
};

const Task: React.FC<TaskProps> = ({ task }) => {

  const { isEndRecode, isEndMix, isEndDraw, isEndMovie, isEndDesign } = task;

  const progress = useMemo(
    () =>
      progressToPercentage([isEndRecode, isEndMix, isEndDraw, isEndMovie, isEndDesign]),
    [isEndRecode, isEndMix, isEndDraw, isEndMovie, isEndDesign]
  );

  const dateDiff = useMemo(
    () => Math.floor(getDateDiff(new Date(), new Date(task.deadline))),
    [task.deadline]
  );

  useEffect(() => {
    console.log(dateDiff);
  }, [dateDiff]);

  return (
    <motion.div
      css={[
        cardBorder[task.progress],
        tw`flex flex-col w-96 rounded-md`,
        tw`select-none cursor-pointer`,
        task.progress === Progress.END && tw`opacity-50`,
      ]}
      whileHover={{ y: -5 }}
    >
      <div css={[labelColor[task.progress], tw`h-6 rounded-t-md`]}></div>

      <div css={tw`p-4`}>
        <div css={tw`flex items-center gap-2`}>
          <h3 css={tw`text-xl font-semibold`}>{task.title}</h3>
          <p css={[tw`text-sm text-gray-500`, dateDiff <= 3 && tw`text-red-400`]}>
            ~ {task.deadline.slice(0, 10)}
          </p>
          {dateDiff <= 3 && <p css={tw`text-xs text-red-300`}>(마감 기한 임박!!)</p>}
        </div>

        <p css={tw`text-sm`}>{task.content}</p>

        <ProgressBar progress={progress} />
      </div>
    </motion.div>
  );
};

export default Task;
