import { Test } from "@nestjs/testing";
import {
  INestApplication,
  HttpStatus,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import request from "supertest";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { map } from "rxjs";
import { ChannelStatController } from "../channelStat.controller";
import { ChannelStatService } from "../channelStat.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  avgVideoRevenue: 42,
  avgViewCount: 42,
  createdAt: new Date(),
  id: "exampleId",
  rpm: 42.42,
  totalRevenue: 42,
  totalViewCount: 42,
  updatedAt: new Date(),
  username: "exampleUsername",
  videoCount: 42,
  ytChannelId: "exampleYtChannelId",
};
const CREATE_RESULT = {
  avgVideoRevenue: 42,
  avgViewCount: 42,
  createdAt: new Date(),
  id: "exampleId",
  rpm: 42.42,
  totalRevenue: 42,
  totalViewCount: 42,
  updatedAt: new Date(),
  username: "exampleUsername",
  videoCount: 42,
  ytChannelId: "exampleYtChannelId",
};
const FIND_MANY_RESULT = [
  {
    avgVideoRevenue: 42,
    avgViewCount: 42,
    createdAt: new Date(),
    id: "exampleId",
    rpm: 42.42,
    totalRevenue: 42,
    totalViewCount: 42,
    updatedAt: new Date(),
    username: "exampleUsername",
    videoCount: 42,
    ytChannelId: "exampleYtChannelId",
  },
];
const FIND_ONE_RESULT = {
  avgVideoRevenue: 42,
  avgViewCount: 42,
  createdAt: new Date(),
  id: "exampleId",
  rpm: 42.42,
  totalRevenue: 42,
  totalViewCount: 42,
  updatedAt: new Date(),
  username: "exampleUsername",
  videoCount: 42,
  ytChannelId: "exampleYtChannelId",
};

const service = {
  createChannelStat() {
    return CREATE_RESULT;
  },
  channelStats: () => FIND_MANY_RESULT,
  channelStat: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

const aclFilterResponseInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle().pipe(
      map((data) => {
        return data;
      })
    );
  },
};
const aclValidateRequestInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle();
  },
};

describe("ChannelStat", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: ChannelStatService,
          useValue: service,
        },
      ],
      controllers: [ChannelStatController],
      imports: [ACLModule],
    })
      .overrideGuard(DefaultAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .overrideInterceptor(AclFilterResponseInterceptor)
      .useValue(aclFilterResponseInterceptor)
      .overrideInterceptor(AclValidateRequestInterceptor)
      .useValue(aclValidateRequestInterceptor)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /channelStats", async () => {
    await request(app.getHttpServer())
      .post("/channelStats")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /channelStats", async () => {
    await request(app.getHttpServer())
      .get("/channelStats")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /channelStats/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/channelStats"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /channelStats/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/channelStats"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  test("POST /channelStats existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/channelStats")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      })
      .then(function () {
        agent
          .post("/channelStats")
          .send(CREATE_INPUT)
          .expect(HttpStatus.CONFLICT)
          .expect({
            statusCode: HttpStatus.CONFLICT,
          });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
