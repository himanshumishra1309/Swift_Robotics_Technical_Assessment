import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import runPipeline from "../services/pipeline.service.js";

const run = asyncHandler(async (req, res) => {
    const result = await runPipeline();

    res.json(
        new ApiResponse(
            200,
            result,
            "Pipeline executed successfully"
        )
    );
});

export { run };