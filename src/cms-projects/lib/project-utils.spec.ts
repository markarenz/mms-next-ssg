import { DEFAULT_METADATA } from '@/common/lib/constants';
import {
  getProjectDetail,
  getProjects,
  getProjectMetadata,
  mapSummaryFromProject,
} from './project-utils';
import { mockProject } from './mocks/mockProject';

describe('getProjectDetail', () => {
  it('returns project detail by slug', () => {
    const result = getProjectDetail('fff', true);
    expect(result?.title).toBeTruthy();
  });

  it('returns dummy content if project does not exist by that slug', () => {
    const result = getProjectDetail('no-project', true);
    expect(result?.title).toBeFalsy();
  });
});

describe('getProjects', () => {
  it('returns a list of project by page', () => {
    const result = getProjects(0);
    expect(result.length).toBeGreaterThan(0);
  });

  it('returns an empty array if page number is invalid', () => {
    const result1 = getProjects(-1);
    expect(result1.length).toBe(0);
    const result2 = getProjects(9999);
    expect(result2.length).toBe(0);
  });
});

describe('getProjectMetadata', () => {
  it('returns metadata for a project', () => {
    const project = {
      slug: 'games-react',
      title: 'Games in React',
      image: 'games-react.jpg',
      datePublished: '2021-01-01',
      metaDescription: 'A list of games built with React',
      images: ['games-react.jpg'],
      link: 'test-link',
      content: 'Games in React content',
    };
    const result = getProjectMetadata(project);
    expect(result?.title || '').toBe(project.title);
    expect(result?.description || '').toBe(project.metaDescription);
    expect(result?.openGraph?.images).toBeTruthy();
  });

  it('returns default metadata for empty project', () => {
    const project = {};
    // @ts-ignore
    const result = getProjectMetadata(project);
    expect(result.title).toEqual(DEFAULT_METADATA.title);
  });
});

describe('mapSummaryFromProject', () => {
  it('returns summary', () => {
    const result = mapSummaryFromProject(mockProject);
    expect(result).toEqual({
      href: '/projects/test-project',
      image: 'projects/49.jpeg',
      slug: 'test-project',
      title: 'Test Project Title',
      type: 'project',
    });
  });
});
