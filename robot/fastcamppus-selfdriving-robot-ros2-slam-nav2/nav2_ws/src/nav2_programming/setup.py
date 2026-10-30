from setuptools import find_packages, setup

package_name = 'nav2_programming'

setup(
    name=package_name,
    version='0.0.0',
    packages=find_packages(exclude=['test']),
    data_files=[
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='ros',
    maintainer_email='ros@todo.todo',
    description='TODO: Package description',
    license='TODO: License declaration',
    extras_require={
        'test': [
            'pytest',
        ],
    },
    entry_points={
        'console_scripts': [
            'navigate_to_pose = nav2_programming.navigate_to_pose:main',
            'navigate_through_poses = nav2_programming.navigate_through_poses:main',
            'follow_waypoints = nav2_programming.follow_waypoints:main',
        ],
    },
)
